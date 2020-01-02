import { Component, OnInit, NgZone } from "@angular/core";
import { getBootCount, clearBootCount } from "./boot-counter";

import { android as androidApp } from "tns-core-modules/application";

const gms = com.google.android.gms;
const LocationServices = gms.location.LocationServices;
const OnSuccessListener = gms.tasks.OnSuccessListener;

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    bootCount: number;

    currentLocation: Location;

    constructor(private zone: NgZone) {
        console.log("AppComponent constructor called!");
    }

    ngOnInit(): void {
        console.log("AppComponent ngOnInit called!");
        this.bootCount = getBootCount();
        if (androidApp) {
            console.log("Android app!");
            const that = this;
            const locationProv = LocationServices.getFusedLocationProviderClient(
                androidApp.context
            );
            console.log("Location provider created!");
            locationProv.getLastLocation().addOnSuccessListener(
                new OnSuccessListener({
                    onSuccess: function(location: android.location.Location) {
                        console.log("Got location!");
                        that.zone.run(() => {
                            that.currentLocation = {
                                longitude: location.getLongitude(),
                                latitude: location.getLatitude(),
                                accuracy: location.getAccuracy()
                            };
                        });
                    }
                })
            );
        }
    }

    reset() {
        this.bootCount = 0;
        clearBootCount();
    }
}

interface Location {
    latitude: number;
    longitude: number;
    accuracy: number;
}
