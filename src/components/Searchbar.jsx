// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { collection, getDocs, query, where } from 'firebase/firestore';


// function Searchbar(props) {

//     // const q = query(collection(db, 'users'), where('username', '==', true));

//     // const querySnapshot = await getDocs(q);
//     // querySnapshot.forEach((doc) => {
//     //     // doc.data() is never undefined for query doc snapshots
//     //     console.log(doc.id, " => ", doc.data());

//     // })

//     // return (
//     //     <div>
//     //         <input 
//     //             type="text" 
//     //             onChange={(event) => setSearch(event.target.value)}
//     //             id="" 
//     //             placeholder='User Search' 
//     //             className='bg-transparent text-white  outline-none placeholder:text-white h-10' 
//     //         />
//     //     </div>
//     // );

//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//         const q = query(collection(db, 'users'), where('displayName', '==', searchTerm));
//         const querySnapshot = await getDocs(q);
//         const results = [];
//         querySnapshot.forEach((doc) => {
//             results.push(doc.data());
//         });
//         setSearchResults(results);
//         }
//         if (searchTerm) {
//         fetchData();
//         }
//     }, [searchTerm]);

//     return (
//         <div>
//         <input
//             type="text"
//             onChange={(event) => setSearchTerm(event.target.value)}
//             id=""
//             placeholder='User Search'
//             className='bg-transparent text-white outline-none placeholder:text-white h-10'
//         />
//         <ul>
//             {searchResults.map((result) => (
//             <li key={result.displayName}>{result.displayName}</li>
//             ))}
//         </ul>
//         </div>
//     );
// }

// export default Searchbar;