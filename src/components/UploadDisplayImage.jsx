import React, { useState } from 'react';

function UploadDisplayImage(props) {
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <div>
            <h1>Upload your profile picture</h1>
            {selectedImage && (
                <div>
                    <img 
                        src={URL.createObjectURL(selectedImage)}
                        alt="N/A"
                        width={'250px'}
                    />
                    <button
                        className='bg-red-400 py-1 px-2 rounded-lg'
                        onClick={(event) => {
                        setSelectedImage(null)
                        event.target.value = null;  
                        }}
                    > 
                        Remove 
                    </button>
                </div>
            )}

            <input 
                type="file"
                name='profileImage'
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0])
                }} 
            />
        </div>
    );
}

export default UploadDisplayImage;