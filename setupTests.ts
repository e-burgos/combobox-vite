import * as Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const enzymeConfig = Enzyme.configure({ adapter: new Adapter() });

export { enzymeConfig };
