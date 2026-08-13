package com.jananijobs.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.HapticFeedbackConstants;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.EdgeToEdge;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import com.getcapacitor.BridgeActivity;
import com.google.android.material.color.DynamicColors;
import com.google.android.material.progressindicator.LinearProgressIndicator;

public class MainActivity extends BridgeActivity {
    private LinearProgressIndicator progressIndicator;
    private SwipeRefreshLayout swipeRefreshLayout;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Enable Edge-to-Edge for immersive UI
        EdgeToEdge.enable(this);
        
        // Enable Dynamic Colors (Material You)
        DynamicColors.applyToActivityIfAvailable(this);
        
        super.onCreate(savedInstanceState);
        
        // Trigger a light haptic on start
        getWindow().getDecorView().performHapticFeedback(android.os.Build.VERSION.SDK_INT >= 30 ? 
            HapticFeedbackConstants.CONFIRM : HapticFeedbackConstants.VIRTUAL_KEY);

        setupPerformanceAndProgress();
    }

    private void setupPerformanceAndProgress() {
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            // --- Performance Optimizations ---
            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setDatabaseEnabled(true);
            settings.setCacheMode(WebSettings.LOAD_DEFAULT);
            settings.setAllowFileAccess(true);
            settings.setGeolocationEnabled(true);
            
            // Speed up rendering
            webView.setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null);
            
            // Additional Performance Boosters
            settings.setAllowContentAccess(true);
            settings.setSaveFormData(true);
            settings.setLoadsImagesAutomatically(true);
            settings.setBlockNetworkImage(false);
            settings.setUseWideViewPort(true);
            settings.setLoadWithOverviewMode(true);

            ViewGroup parent = (ViewGroup) webView.getParent();
            if (parent != null) {
                int index = parent.indexOfChild(webView);
                parent.removeView(webView);

                // Create Progress Indicator
                progressIndicator = new LinearProgressIndicator(this);
                progressIndicator.setIndeterminate(false);
                progressIndicator.setIndicatorColor(getResources().getColor(R.color.primary, getTheme()));
                progressIndicator.setTrackColor(android.graphics.Color.TRANSPARENT);

                // Create SwipeRefreshLayout
                swipeRefreshLayout = new SwipeRefreshLayout(this);
                swipeRefreshLayout.setColorSchemeColors(getResources().getColor(R.color.primary, getTheme()));
                swipeRefreshLayout.setOnRefreshListener(() -> {
                    webView.reload();
                    // Give a haptic feedback on pull
                    getWindow().getDecorView().performHapticFeedback(HapticFeedbackConstants.CLOCK_TICK);
                });
                swipeRefreshLayout.addView(webView, new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

                // Container for SwipeRefresh and Progress bar
                android.widget.FrameLayout container = new android.widget.FrameLayout(this);
                container.addView(swipeRefreshLayout, new android.widget.FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                container.addView(progressIndicator, new android.widget.FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                
                parent.addView(container, index, new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

                // Listen for progress and handle external URLs
                webView.setWebChromeClient(new android.webkit.WebChromeClient() {
                    @Override
                    public void onProgressChanged(WebView view, int newProgress) {
                        if (progressIndicator != null) {
                            progressIndicator.setProgress(newProgress, true);
                            if (newProgress == 100) {
                                progressIndicator.setVisibility(android.view.View.GONE);
                                if (swipeRefreshLayout.isRefreshing()) {
                                    swipeRefreshLayout.setRefreshing(false);
                                }
                            } else {
                                progressIndicator.setVisibility(android.view.View.VISIBLE);
                            }
                        }
                    }
                });

                // Custom WebViewClient for external links handling
                webView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                        String url = request.getUrl().toString();
                        
                        // Handle WhatsApp links directly
                        if (url.startsWith("whatsapp://") || url.startsWith("https://api.whatsapp.com/")) {
                            try {
                                Intent intent = new Intent(Intent.ACTION_VIEW);
                                intent.setData(Uri.parse(url));
                                startActivity(intent);
                                return true;
                            } catch (Exception e) {
                                return false; // WhatsApp not installed, let webview try to handle it
                            }
                        }

                        // Open external government sites and PDFs in default Android browser
                        if (!url.contains("janani-jobs-beta.vercel.app") && 
                            !url.contains("localhost") && 
                            !url.startsWith("file://")) {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                            startActivity(intent);
                            return true;
                        }
                        
                        return false;
                    }
                });
            }
        }
    }

    @Override
    public void onBackPressed() {
        WebView webView = getBridge().getWebView();
        if (webView != null && webView.canGoBack()) {
            webView.goBack(); // Go back in web history
        } else {
            super.onBackPressed(); // Exit app
        }
    }
}
