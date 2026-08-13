package com.jananijobs.app;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.HapticFeedbackConstants;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.getcapacitor.BridgeActivity;
import com.google.android.material.color.DynamicColors;
import com.google.android.material.progressindicator.LinearProgressIndicator;

public class MainActivity extends BridgeActivity {
    private LinearProgressIndicator progressIndicator;
    private SwipeRefreshLayout swipeRefreshLayout;
    private WebView webView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Enable Edge-to-Edge for immersive UI
        EdgeToEdge.enable(this);

        // Enable Dynamic Colors (Material You)
        DynamicColors.applyToActivityIfAvailable(this);

        super.onCreate(savedInstanceState);

        // Trigger a light haptic on start
        try {
            getWindow().getDecorView().performHapticFeedback(
                android.os.Build.VERSION.SDK_INT >= 30 ?
                    HapticFeedbackConstants.CONFIRM : HapticFeedbackConstants.VIRTUAL_KEY
            );
        } catch (Exception ignored) {}

        setupEnhancedWebView();
    }

    private void setupEnhancedWebView() {
        webView = getBridge().getWebView();
        if (webView == null) return;

        // --- Performance Optimizations ---
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setSaveFormData(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setBlockNetworkImage(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Speed up rendering
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

        // --- Build Enhanced UI Container ---
        ViewGroup parent = (ViewGroup) webView.getParent();
        if (parent == null) return;

        int index = parent.indexOfChild(webView);
        parent.removeView(webView);

        // 1. Progress Indicator (top loading bar)
        progressIndicator = new LinearProgressIndicator(this);
        progressIndicator.setIndeterminate(false);
        progressIndicator.setIndicatorColor(getResources().getColor(R.color.primary, getTheme()));
        progressIndicator.setTrackColor(android.graphics.Color.TRANSPARENT);
        progressIndicator.setVisibility(View.GONE);

        // 2. SwipeRefreshLayout (pull-to-refresh)
        swipeRefreshLayout = new SwipeRefreshLayout(this);
        swipeRefreshLayout.setColorSchemeColors(
            getResources().getColor(R.color.primary, getTheme()),
            getResources().getColor(R.color.secondary, getTheme()),
            getResources().getColor(R.color.tertiary, getTheme())
        );
        swipeRefreshLayout.addView(webView, new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        swipeRefreshLayout.setOnRefreshListener(() -> {
            webView.reload();
        });

        // 3. Container with progress bar on top
        FrameLayout container = new FrameLayout(this);
        container.addView(swipeRefreshLayout, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        container.addView(progressIndicator, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        parent.addView(container, index, new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        // --- WebChromeClient: Progress Bar ---
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (progressIndicator != null) {
                    progressIndicator.setProgress(newProgress, true);
                    if (newProgress >= 100) {
                        progressIndicator.setVisibility(View.GONE);
                        if (swipeRefreshLayout.isRefreshing()) {
                            swipeRefreshLayout.setRefreshing(false);
                        }
                    } else {
                        progressIndicator.setVisibility(View.VISIBLE);
                    }
                }
            }
        });

        // --- WebViewClient: External Links + Offline Handling ---
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();

                // Keep internal navigation inside the app
                if (url.contains("janani-jobs") || url.contains("vercel.app")) {
                    return false; // Load inside WebView
                }

                // Open external links (govt portals, WhatsApp, etc.) in the phone's browser
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                } catch (Exception e) {
                    Toast.makeText(MainActivity.this, "Unable to open link", Toast.LENGTH_SHORT).show();
                }
                return true; // Don't load externally in WebView
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                if (progressIndicator != null) {
                    progressIndicator.setVisibility(View.VISIBLE);
                    progressIndicator.setProgress(0);
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (progressIndicator != null) {
                    progressIndicator.setVisibility(View.GONE);
                }
                if (swipeRefreshLayout != null && swipeRefreshLayout.isRefreshing()) {
                    swipeRefreshLayout.setRefreshing(false);
                }
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                // Show offline page only for main frame navigation failures
                if (request.isForMainFrame()) {
                    showOfflinePage(view);
                }
            }
        });
    }

    /**
     * Show a clean offline error page when there's no internet
     */
    private void showOfflinePage(WebView view) {
        String offlineHtml = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'>"
            + "<style>"
            + "body{font-family:Arial,sans-serif;text-align:center;padding:60px 20px;background:#f8f9fa;color:#333;margin:0;}"
            + ".icon{font-size:64px;margin-bottom:20px;}"
            + "h1{color:#004085;font-size:22px;margin-bottom:10px;}"
            + "p{color:#666;font-size:14px;line-height:1.6;margin-bottom:25px;}"
            + "button{background:#004085;color:#fff;border:none;padding:12px 30px;font-size:15px;"
            + "font-weight:bold;border-radius:6px;cursor:pointer;}"
            + "button:active{background:#002752;}"
            + "</style></head><body>"
            + "<div class='icon'>📡</div>"
            + "<h1>No Internet Connection</h1>"
            + "<p>Please check your WiFi or Mobile Data and try again.<br>New job alerts will load once you're back online!</p>"
            + "<button onclick='window.location.reload()'>Retry Connection 🔄</button>"
            + "</body></html>";

        view.loadData(offlineHtml, "text/html", "UTF-8");
    }

    /**
     * Handle Android back button: go back in WebView history before exiting
     */
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView != null && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
