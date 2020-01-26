import React, {useContext} from 'react';
import { TableContext } from './CheckMemo';
import Li from './Li';

const Ul = () => {

  const { dispatch } = useContext(TableContext);

    return(

        <ul>
          <Li />
        </ul>

    );
}

export default Ul;
