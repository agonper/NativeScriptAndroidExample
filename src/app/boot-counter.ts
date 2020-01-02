import {
    getNumber,
    setNumber,
    remove
} from "tns-core-modules/application-settings";

const BOOT_COUNTER = "boot_counter";

export function incrementBootCount() {
    let count = getBootCount();
    count++;
    setNumber(BOOT_COUNTER, count);
}

export function getBootCount() {
    return getNumber(BOOT_COUNTER, 0);
}

export function clearBootCount() {
    remove(BOOT_COUNTER);
}
