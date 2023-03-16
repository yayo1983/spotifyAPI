import React, { useRef } from "react";
import { showToast } from "../common";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { spotifyActions } from "../../store/spotify";
import { useSelector, useDispatch } from "react-redux";
import { searchArtistAction } from '../../store/spotify-actions';


const SearchByArtist = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.spotifyr.name);
  const dataArtists = useSelector((state) => state.spotifyr.dataArtists);
  const topTracks = useSelector((state) => state.spotifyr.topTracks);
  const errorSearch = useSelector((state) => state.spotifyr.errorSearch);

  const setName = (value) => {
    dispatch(spotifyActions.setName(value));
  };

  const validateNameInput = () => {
    //se chequea con el regex que solo tenga caracteres alfanumeros
    let char_alpha = /^[0-9a-zA-Z]+$/;
    //se chequea con el regex que no comience por números
    let numero_init = /^\d/;
    if (name === null || name === "" || numero_init.test(name) || !char_alpha.test(name) ) {
      return false;
    }
    return true;
  };

  const searchArtist = () => {
    if(validateNameInput()){
      let result = dispatch(searchArtistAction(name));
      if (result){
        showToast("success", "Success", "Búsqueda satisfactoria", toast);
      }else{
        showToast(
          "error",
          "Error",
          "Error en la búsqueda por el nombre del artista",
          toast
        );
      }
    }
    else {
      dispatch(spotifyActions.setErrorName(true));
      showToast(
        "error",
        "Error",
        "Error en la búsqueda por el nombre del artista",
        toast
      );
    }
  };

  const showTopTracks = (id) =>{
    let index = dataArtists.findIndex((artist) => {
    if (artist.id === id){
      return true;
    }});
    let listTracks = topTracks[index];
    let stringtrack = '';
    if( !listTracks || listTracks.length == 0){
      return;
    }
    listTracks.forEach(function(track){
      stringtrack = stringtrack + ' - ' + track.name;
    });
    return stringtrack;

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
            <Column
              field="id"
              header="Los mejores temas"
              body={(artist) =>
                artist.id != null
                  ? showTopTracks(artist.id)
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
