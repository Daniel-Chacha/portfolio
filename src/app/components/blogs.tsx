'use client'
import { useState, useRef} from "react"
import * as mammoth from 'mammoth';
//defining type for blog posts
interface BlogPost{
    title: string;
    description: string;
    filePath :  string;
    fileType : 'pdf' | 'docx';
}

//sample blog post
const blogPosts : BlogPost[] =[
    {
        title: "Software Engineering",
        description : "Some interesting thoughts and ideas",
        filePath: "/documents/Software.docx",
        fileType: 'docx',
    },
    {
        title: "Software Engineering",
        description : "Some interesting thoughts and ideas",
        filePath: "/documents/Software.docx",
        fileType: 'docx',
    }
]

export const Blogs: React.FC = () =>{
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null >(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    const openModal = (post : BlogPost) =>{
        setSelectedPost(post);
        loadDocument(post);
    };

    const closeModal = ()=>{
        setSelectedPost(null);
        setError(null);
        if(canvasContainerRef.current){
            canvasContainerRef.current.innerHTML = '';
        }
    };

    const loadDocument = async(post: BlogPost) =>{
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(post.filePath); 
            if (!response.ok) throw new Error('Failed to fetch document')

            if(post.fileType === 'docx'){
                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({arrayBuffer});
                console.log('ARRAY BUFFER DOCX', arrayBuffer,'\nDOCX RESULT', result.value);
                if(canvasContainerRef.current){
                    canvasContainerRef.current.innerHTML = result.value;
                }
            }
        }catch(err){
            setError('Failed to load document: '+ (err instanceof Error ? err.message : String(err)));
        }finally{
            setIsLoading(false);
        };
    }
    return(
        <div id="blogs" className="p-5  bg-slate-950 mt-20">
            <h2  className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted ">BLOGS</h2>

            <div className="flex flex-row justify-center items-center" >
                {blogPosts.map((post, index) =>(
                    <div className="bg-[#0F0F2D]  shadow-md p-4 m-5 relative" key={index}>
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.description}</p>
                        <button className="bg-black bg-opacity-[10%] text-cyan-300 border px-4 py-2 font-semibold cursor-pointer transition-colors"
                        onClick={() => openModal(post)}>OPEN</button>

                        {/*Top-left corner border*/}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-300"></div>

                        {/*Bottom right corner border*/}
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-300"></div>
                    </div>
                ))}
            </div>

            {/*modal for full content*/}
            {selectedPost &&(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-around z-50" onClick={closeModal}>
                    <div className="bg-slate-950 w-full max-w-3xl h-[90vh] m-4 rounded-lg p-6 flex flex-col relative" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-0 right-0 text-2xl font-bold h-12 w-12 rounded-full text-white cursor-pointer" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                        </button>

                        <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-8 ">{selectedPost.title}</h2>

                        {/*Document viewer container*/}
                        <div className="flex-1 overflow-y-auto mb-4 prose max-w-none">
                            {isloading && (
                                <div className="text-center py-4">
                                    <span className="animate-pulse">Loading document...</span>
                                </div>
                            )}
                            {error && (
                                <div className="text-red-500 py-4">{error}</div>
                            )}                           
                            <div ref={canvasContainerRef} className="p-4 font-white">
                            </div>
                            
                        </div>

                        {/*Download button*/}
                        <a href={selectedPost.filePath} download className="absolute left-20 top-3 bg-slate-950 w-6 text-cyan-300  rounded ">
                        <svg className=" " xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1"/><path fill="currentColor" d="M6 17a1 1 0 1 0-2 0v.6C4 19.482 5.518 21 7.4 21h9.2c1.882 0 3.4-1.518 3.4-3.4V17a1 1 0 1 0-2 0v.6c0 .778-.622 1.4-1.4 1.4H7.4c-.778 0-1.4-.622-1.4-1.4z"/></svg>
                            
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
