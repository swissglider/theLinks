import { useSelector } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';
import { RootState } from '../../../redux/Store';

const isAuthenticated = (withRedirect?: boolean): boolean => {
    const history = useHistory();

    const fb = useSelector((state: RootState) => state.firebase) as any;
    withRedirect = withRedirect !== undefined && withRedirect === true ? true : false;

    const redirect = () => {
        history.push(getMainComponentsConfigurationByLabel('Links').to);
    };

    if (!('auth' in fb)) {
        if (withRedirect) redirect();
        return false;
    }
    const auth = fb.auth;

    const rV = isLoaded(auth) && !isEmpty(auth);
    if (withRedirect && !rV) redirect();
    return rV;
};

export default isAuthenticated;
