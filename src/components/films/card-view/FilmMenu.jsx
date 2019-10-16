import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import api from "../../../services/api";

export default function FilmMenu(props) {
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

    const removeFilm = () => {
        const keyImage = film.info.image_url.replace('https://s3dynamox.s3.amazonaws.com/', '');
        const keyFilm = film.info.video_url.replace('https://s3dynamox.s3.amazonaws.com/', '');

        const data = {keyImage, keyFilm};

        api.delete('file', {data}).then( res => {
            console.log(res);
        }).catch( err => console.log(err));

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
