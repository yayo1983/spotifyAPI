import { formatD, showToast } from "../common";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import React, { useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { useSelector, useDispatch } from "react-redux";
import { getNewReleasesAction } from '../../store/spotify-actions';

const NewReleases = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const newReleases = useSelector((state) => state.spotifyr.newReleases);

  const getNewReleases = async () => {
      let result = dispatch(getNewReleasesAction());
      if(!result){
        showToast("error", "Error", "Error en la petición de los datos", toast);
      }
  };

  const ToStringArtists = (listArtists) =>{
    let stringArtists = '';
    listArtists.forEach(function(artist){
      stringArtists = stringArtists + artist.name+ ', '
    });
    return stringArtists;
  };

  const albumCover = ( url ) => {
    return (
      <span>
        <img src={url} alt="Album cover" width={100} height={100} ></img>
      </span>
    );
  }

  useEffect(() => {
    getNewReleases();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Los nuevos lanzamientos</h2>
        </div>
        <div className="col-sm-4"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-2  "></div>
        <div className="col-sm-8">
          <DataTable value={newReleases} responsiveLayout="scroll">
            <Column field="album_group" header="Grupo de álbumes"></Column>
            <Column field="album_type" header="Tipo album"></Column>
            <Column field="type" header="Tipo"></Column>
            <Column
              field="artists"
              header="Artistas"
              body={(release) =>
                release.artists != null
                  ? ToStringArtists(release.artists)
                  : ""
              }
            ></Column>
            <Column field="name" header="Nombre del lanzamiento"></Column>
            <Column
              field="release_date"
              header="Fecha de lanzamiento"
              body={(release) =>
                release.release_date != null
                  ? formatD(release.release_date)
                  : ""
              }
            ></Column>
            <Column
              field="images"
              header="Portada"
              body={(release) =>
                release.images != null &&  release.images.length > 0
                  ? albumCover(release.images[0].url)
                  : ""
              }
            ></Column>
            <Column field="total_tracks" header="Total de pistas"></Column> 
          </DataTable>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};

export default NewReleases;
