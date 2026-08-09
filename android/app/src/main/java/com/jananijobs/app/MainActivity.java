package com.jananijobs.app;

import android.os.Bundle;
import android.view.HapticFeedbackConstants;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;
import com.google.android.material.color.DynamicColors;
import com.google.android.material.progressindicator.LinearProgressIndicator;

public class MainActivity extends BridgeActivity {
    private LinearProgressIndicator progressIndicator;

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

                // Container for WebView and Progress bar
                android.widget.FrameLayout container = new android.widget.FrameLayout(this);
                container.addView(webView, new android.widget.FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                container.addView(progressIndicator, new android.widget.FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                
                parent.addView(container, index, new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

                // Listen for progress
                webView.setWebChromeClient(new android.webkit.WebChromeClient() {
                    @Override
                    public void onProgressChanged(WebView view, int newProgress) {
                        if (progressIndicator != null) {
                            progressIndicator.setProgress(newProgress, true);
                            if (newProgress == 100) {
                                progressIndicator.setVisibility(android.view.View.GONE);
                            } else {
                                progressIndicator.setVisibility(android.view.View.VISIBLE);
                            }
                        }
                    }
                });
            }
        }
    }
}
