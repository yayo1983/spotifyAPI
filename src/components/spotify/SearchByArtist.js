import { get } from "../common";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { spotifyActions } from "../../store/spotify";
import { useSelector, useDispatch } from "react-redux";

const SearchByArtist = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.spotifyr.name);
  const dataArtists = useSelector((state) => state.spotifyr.dataArtists);
  const [tracks, setTracks] = useState([]);
  const errorSearch = useSelector((state) => state.spotifyr.errorSearch);

  const setName = (value) => {
    dispatch(spotifyActions.setName(value));
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const validateNameInput = () => {
    if (name === null || name === "") {
      return false;
    }
    return true;
  };

  const searchArtist = async () => {
    try {
      dispatch(spotifyActions.setErrorName(false));
      if (validateNameInput()) {
        let data = {
          q: name,
          type: "artist",
        };
        let response = await get("search", data);
        if (response.status != 200) {          
          showToast("error", "Error", response.message);
        } else {
          console.log();  
          dispatch(spotifyActions.clearForm());
          dispatch(spotifyActions.setDataArtists(response.data.artists.items));
          showToast("success", "Success", "Búsqueda satisfactoria");
        }
      } else {
        dispatch(spotifyActions.setErrorName(true));
        showToast("error", "Error", "El nombre del artista esta incorrecto");
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Error en la búsqueda por el nombre del artista"
      );
    }
  };

  const getArtists = async (id) => {
    try {
      dispatch(spotifyActions.setErrorName(false));
      let response = await get("artists/"+id);
      response = JSON.stringify(response);
      if (response.status != 200) {
        showToast("error", "Error", response.message);
      } else {
        setTracks(response.data);
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Error en la búsqueda por el nombre del artista"
      );
    }
  };

  const getTracks = async (discography_id) => {
    try {
      dispatch(spotifyActions.setErrorName(false));
      let response = await get("albums/" + discography_id + "/tracks'");
      response = JSON.stringify(response);
      if (response.status != 200) {
        showToast("error", "Error", response.message);
      } else {
        setTracks(response.data);
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Error en la búsqueda por el nombre del artista"
      );
    }
  };

  let classErrorSearch = errorSearch ? "p-invalid mr-2" : "";

  return (
    <>
      <Toast ref={toast} />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Buscar por artista </h2>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <Panel header="Búsqueda">
            <div className="mb-3">
              Nombre de artista:
              <br />
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  placeholder="Escribir nombre"
                  className={classErrorSearch}
                  onChange={(e) => setName(e.target.value)}
                  tooltip="Este campo es para el nombre del artista"
                />
              </span>
              {errorSearch && (
                <Message
                  severity="error"
                  text="Error en el nombre del artista"
                />
              )}
            </div>

            <div className="flex flex-wrap align-items-center justify-content-left">
              <Button
                label="Buscar"
                icon="pi pi-check"
                onClick={searchArtist}
              />
            </div>
          </Panel>
          <div className="col-sm-4"></div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-2  "></div>
        <div className="col-sm-8 ">
          <DataTable value={dataArtists} responsiveLayout="scroll">
            <Column field="name" header="Nombre del artista"></Column> 
            <Column field="popularity" header="Popularidad"></Column>
            <Column
              field="genres"
              header="Género"
              body={(artist) =>
                artist.genres != null
                  ? artist.genres.toString()
                  : ""
              }
            ></Column>
            <Column
              field="followers"
              header="Seguidores"
              body={(artist) =>
                artist.followers != null
                  ? artist.followers.total
                  : ""
              }
            ></Column>
          </DataTable>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};

export default SearchByArtist;
