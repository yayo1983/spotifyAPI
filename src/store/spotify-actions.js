
const getNewReleases = async () => {
    try {
      let response = await get("browse/new-releases");
      if (response.status !== 200) {
        showToast("error", "Error", "Error en la petición de los datos");
      } else {
        setNewReleases(response.data.albums.items);
      }
    } catch (error) {
      setNewReleases([]);
      showToast("error", "Error", "Error en la petición de los datos");
    }
  };