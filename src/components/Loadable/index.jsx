// import Toast from '../Toast';
import Loadable from 'react-loadable';
import Spinner from '../Spinner';

export default function asyncComp(loader) {
  return Loadable({ loader, loading: Spinner });
}
