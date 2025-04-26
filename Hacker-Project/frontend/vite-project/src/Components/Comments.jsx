import {React ,  useMemo , useState} from 'react';
import { fetchCommentsPage } from '../../Api/ApiService';

export const Comments = () => {
    const [comments , setComments] = useState('');

    useMemo(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCommentsPage();
                setComments(response.data)
            }
            catch(error) 
            {
                alert("Error Fetching Comments Data" , error );
            } 
        };
        fetchData();
    }, [])
    return (
        <div style={{ padding: '40px' , color: 'black' , fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
            {comments}
        </div>
    )
}

export default Comments; 