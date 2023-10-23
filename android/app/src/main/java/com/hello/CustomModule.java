package com.yeneguzo;;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.app.Activity;

public class CustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public CustomModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void getCurrentActivityName(Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            promise.resolve(currentActivity.getClass().getSimpleName());
        } else {
            promise.reject("ACTIVITY_NULL", "Current activity is null");
        }
    }
}
