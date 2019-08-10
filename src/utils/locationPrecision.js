const PRECISION_11_METERS = 10000;
const PRECISION_DIFFERENCE = 1;

const getDecimalPart = (number) => {
    let n = Math.abs(number);
    let decimal = n - Math.floor(n);

    return decimal;
};

const extractDecimalsWithPrecision = (number) => {
    const decimals = getDecimalPart(number);

    return Math.floor(decimals * PRECISION_11_METERS);
};

const shouldUpdateLocation = (lastLocation, newLocation) => {
    if (lastLocation == null) {
        return true;
    }

    const oldLatitude = extractDecimalsWithPrecision(lastLocation.latitude);
    const oldLongitude = extractDecimalsWithPrecision(lastLocation.longitude);
    const newLatitude = extractDecimalsWithPrecision(newLocation.latitude);
    const newLongitude = extractDecimalsWithPrecision(newLocation.longitude);

    console.log(oldLatitude, newLatitude);

    const latitudeDifference = Math.abs(newLatitude - oldLatitude);
    const longitudeDifference = Math.abs(newLongitude - oldLongitude);

    if (latitudeDifference > PRECISION_DIFFERENCE || longitudeDifference > PRECISION_DIFFERENCE) {
        return true;
    }
    return false;
};

module.exports = shouldUpdateLocation;