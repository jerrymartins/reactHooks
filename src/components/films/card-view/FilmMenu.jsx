import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import api from "../../../services/api";
import {useDispatch} from "react-redux";

export default function FilmMenu(props) {
    const dispath = useDispatch();
    const film = props.filmData;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateFilm = () => {
        setAnchorEl(null);
    };

    const deleteFiles = () => {
        const data = {
            keyImage: film.info.image_url.replace('https://s3dynamox.s3.amazonaws.com/', ''),
            keyFilm: film.info.video_url.replace('https://s3dynamox.s3.amazonaws.com/', '')
        };

        return api.delete('file', {data});
    };

    const deleteFilm = () => {
        return api.delete(`films/${film.yearFilm}/${film.title}`);
    }

    const removeFilm = () => {
        deleteFiles().then( sucessDeleteFiles => {
            console.log(sucessDeleteFiles)
            if (sucessDeleteFiles.data.Errors.length > 0) {
                console.log('ocorreram erros');
            } else {
                deleteFilm().then( sucessDeleteFilm => {
                    dispath({type: 'FILM', ...{loadData: true}});
                }).catch( errFilm => {
                    console.log(errFilm);
                })
            }
        }).catch(errFile => console.log(errFile));

        setAnchorEl(null);
    };

    return (
        <div>
            <Button size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Opções
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={updateFilm}>Atualizar</MenuItem>
                <MenuItem onClick={removeFilm}>Remover</MenuItem>
            </Menu>
        </div>
    );
}
