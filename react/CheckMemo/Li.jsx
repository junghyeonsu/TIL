import React, {useContext,useCallback} from 'react';
import {TableContext , CLICK_LI} from './CheckMemo';


const Li = () => {

  const { dispatch } = useContext(TableContext);

  const onClickli = () => {
    dispatch({type:CLICK_LI});
  }
  
    return(

        <li onClick={onClickli} ></li>

    );

}

export default Li;
