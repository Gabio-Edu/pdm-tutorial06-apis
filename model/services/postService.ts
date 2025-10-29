import axios from 'axios';
import Post from '../entities/post';


export default class PostService{
    static BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

    async getPosts():Promise<Post[]>{
        let response = await axios.get<Post[]>(PostService.BASE_URL);
        return response.data;
    }

}
