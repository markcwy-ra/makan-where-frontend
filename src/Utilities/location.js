const getLocation = async (setLocation) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Can't find your location! Enable location services for your browser in settings."
        );
        setLocation({
          lat: 1.3521,
          lng: 103.8198,
        });
      }
    },
    {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    }
  );
};

export default getLocation;
