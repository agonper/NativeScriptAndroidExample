import { incrementBootCount } from "./boot-counter";

@JavaProxy("org.nativescript.MyApp.BootBroadcastReceiver")
class BootBroadcastReceiver extends android.content.BroadcastReceiver {
    public onReceive(
        context: android.content.Context,
        intent: android.content.Intent
    ) {
        console.log("Boot completed!");
        incrementBootCount();
    }
}
