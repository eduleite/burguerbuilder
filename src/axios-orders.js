import axios from 'axios';

const burguerBuilderAxios = axios.create({
    baseURL: 'https://react-my-burger-da199.firebaseio.com/'
});

export default burguerBuilderAxios;