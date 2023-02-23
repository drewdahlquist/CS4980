
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

export function TaskDetails(props) {

    return (
        <BootstrapDialog
        onClose={props.close}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        style={{
          opacity:0.7,
        }}
        maxWidth='lg'
      >
        <BootstrapDialogTitle 
        id="customized-dialog-title" 
        onClose={props.close}
        style={{
          textAlign:'center'
        }}
        >
          {props.content}
        </BootstrapDialogTitle>
        <DialogContent dividers
        style={{
          width:'500px',
          textAlign:'center'
        }
        }>
          <Typography gutterBottom>
            {props.date}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    )
  }
