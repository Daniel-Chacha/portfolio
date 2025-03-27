// 'use client'
// import { useState, useRef, useEffect } from "react"
// // import { File, BookOpen } from "lucide-react"
// import * as mammoth from 'mammoth';
// // import * as Mammoth from 'mammoth/mammoth.browser';
// import * as pdfjsLib from 'pdfjs-dist';
// // import 'pdfjs-dist/build/pdf.worker.entry'; // Import the worker from the package
// // import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// // pdfjsLib.GlobalWorkerOptions.workerSrc =pdfjsWorker

// // Set the worker source for PDF.js
// // pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// //defining type for blog posts
// interface BlogPost{
//     title: string;
//     description: string;
//     filePath :  string;
//     fileType : 'pdf' | 'docx';
// }

// //sample blog post
// const blogPosts : BlogPost[] =[
//     {
//         title: "My Assignment Post",
//         description: "A brief introduction to my blog content",
//         filePath: '/documents/Assignment.pdf',
//         fileType: 'pdf',
//     },
//     {
//         title: "Software Engineering",
//         description : "Some interesting thoughts and ideas",
//         filePath: "/documents/Software.docx",
//         fileType: 'docx',
//     }
// ]

// export const Blogs: React.FC = () =>{
//     const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
//     const [isloading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null >(null);
//     const canvasContainerRef = useRef<HTMLDivElement>(null);

//     const openModal = (post : BlogPost) =>{
//         setSelectedPost(post);
//         loadDocument(post);
//     };

//     // Set up PDF.js worker on client-side only
//   useEffect(() => {
//     // Only run on client-side
//     if (typeof window !== 'undefined') {
//       // Use a CDN version or local worker that matches your pdfjs-dist version
//       pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
//     }
//   }, []);

//     const closeModal = ()=>{
//         setSelectedPost(null);
//         setError(null);
//         if(canvasContainerRef.current){
//             canvasContainerRef.current.innerHTML = '';
//         }
//     };

//     const loadDocument = async(post: BlogPost) =>{
//         setIsLoading(true);
//         setError(null);

//         try{
//             const response = await fetch(post.filePath); 
//             if (!response.ok) throw new Error('Failed to fetch document')

//             if(post.fileType === 'pdf'){
//                 const arrayBuffer = await response.arrayBuffer();
//                 const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
//                 console.log('PDF',pdf);

//                 if(canvasContainerRef.current){
//                     canvasContainerRef.current.innerHTML = ''; //clear previous content

//                     for(let i =1; i<= pdf.numPages; i++){
//                         const page = await pdf.getPage(i);
//                         const viewport = page.getViewport({scale: 1.5}) //adjust scale as needed

//                         //create canvas for each page
//                         const canvas = document.createElement('canvas');
//                         canvas.className = 'mb-4 border border-gray-200';
//                         canvas.width = viewport.width;
//                         canvas.height = viewport.height;

//                         const context = canvas.getContext('2d');
//                         if(context){
//                             await page.render({
//                                 canvasContext: context,
//                                 viewport: viewport
//                             }).promise;
//                         }

//                         canvasContainerRef.current.appendChild(canvas);
//                         console.log('PDF CANVAS', canvas);
//                     }
//                 }
//             }else if(post.fileType === 'docx'){
//                 const arrayBuffer = await response.arrayBuffer();
//                 const result = await mammoth.convertToHtml({arrayBuffer});
//                 console.log('ARRAY BUFFER DOCX', arrayBuffer,'\nDOCX RESULT', result.value);
//                 if(canvasContainerRef.current){
//                     canvasContainerRef.current.innerHTML = result.value;
//                 }
//             }
//         }catch(err){
//             setError('Failed to load document: '+ (err instanceof Error ? err.message : String(err)));
//         }finally{
//             setIsLoading(false);
//         };
//     }
//     return(
//         <div className="p-5  bg-slate-950 mt-20">
//             <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted ">BLOGS</h2>

//             <div className="flex flex-row justify-center items-center" >
//                 {blogPosts.map((post, index) =>(
//                     <div className="bg-[#0F0F2D]  shadow-md p-4 m-5 relative" key={index}>
//                         <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
//                         <p className="text-gray-600 mb-4">{post.description}</p>
//                         <button className="bg-black bg-opacity-[10%] text-cyan-300 border px-4 py-2 font-semibold cursor-pointer transition-colors"
//                         onClick={() => openModal(post)}>OPEN</button>

//                         {/*Top-left corner border*/}
//                         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-300"></div>

//                         {/*Bottom right corner border*/}
//                         <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-300"></div>
//                     </div>
//                 ))}
//             </div>

//             {/*modal for full content*/}
//             {selectedPost &&(
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-around z-50" onClick={closeModal}>
//                     <div className="bg-slate-950 w-full max-w-3xl h-[80vh] m-4 rounded-lg p-6 flex flex-col relative" onClick={e => e.stopPropagation()}>
//                         <button className="absolute top-2 right-2 text-2xl font-bold hover:text-gray-700" onClick={closeModal}> x </button>

//                         <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted">{selectedPost.title}</h2>

//                         {/*Document viewer container*/}
//                         <div className="flex-1 overflow-y-auto mb-4 prose max-w-none">
//                             {isloading && (
//                                 <div className="text-center py-4">
//                                     <span className="animate-pulse">Loading document...</span>
//                                 </div>
//                             )}
//                             {error && (
//                                 <div className="text-red-500 py-4">{error}</div>
//                             )}

//                             {!isloading && !error &&(
//                                 <div ref={canvasContainerRef} className="p-4 font-white">
//                                 </div>
//                             )}
//                         </div>

//                         {/*Download button*/}
//                         <a href={selectedPost.filePath} download className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-center">
//                             Download{selectedPost.fileType.toUpperCase()}
//                         </a>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

'use client'
import { useState, useRef, useEffect } from "react"
import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Define the type for blog posts
interface BlogPost {
    title: string;
    description: string;
    filePath: string;
    fileType: 'pdf' | 'docx';
}

// Sample blog posts
const blogPosts: BlogPost[] = [
    {
        title: "My Assignment Post",
        description: "A brief introduction to my blog content",
        filePath: '/documents/Assignment.pdf',
        fileType: 'pdf',
    },
    {
        title: "Software Engineering",
        description: "Some interesting thoughts and ideas",
        filePath: "/documents/Software.docx",
        fileType: 'docx',
    }
]

export const Blogs: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [contentLoaded, setContentLoaded] = useState(false); // New state to force re-render
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    // Set up PDF.js worker on client-side only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
        }
    }, []);

    const openModal = (post: BlogPost) => {
        setSelectedPost(post);
        loadDocument(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setError(null);
        setContentLoaded(false);
        if (canvasContainerRef.current) {
            canvasContainerRef.current.innerHTML = '';
        }
    };

    const loadDocument = async (post: BlogPost) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(post.filePath);
            if (!response.ok) throw new Error('Failed to fetch document');

            if (post.fileType === 'pdf') {
                const arrayBuffer = await response.arrayBuffer();
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

                if (canvasContainerRef.current) {
                    canvasContainerRef.current.innerHTML = ''; // Clear previous content

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 1.5 });

                        const canvas = document.createElement('canvas');
                        canvas.className = 'mb-4 border border-gray-200 w-full';
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        const context = canvas.getContext('2d');
                        if (context) {
                            await page.render({
                                canvasContext: context,
                                viewport: viewport
                            }).promise;
                        }

                        canvasContainerRef.current.appendChild(canvas);
                    }
                    setContentLoaded(true); // Trigger re-render after content is loaded
                }
            } else if (post.fileType === 'docx') {
                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                console.log('ARRAY BUFFER DOCX', arrayBuffer,'\nDOCX RESULT', result.value);
                if (canvasContainerRef.current) {
                    canvasContainerRef.current.innerHTML = result.value;
                    setContentLoaded(true); // Trigger re-render after content is loaded
                }
            }
        } catch (err) {
            setError('Failed to load document: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5 bg-slate-950 mt-20">
            <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted">BLOGS</h2>

            <div className="flex flex-row justify-center items-center">
                {blogPosts.map((post, index) => (
                    <div className="bg-[#0F0F2D] shadow-md p-4 m-5 relative" key={index}>
                        <h2 className="text-xl font-semibold mb-2 text-white">{post.title}</h2>
                        <p className="text-gray-400 mb-4">{post.description}</p>
                        <button
                            className="bg-black bg-opacity-[10%] text-cyan-300 border px-4 py-2 font-semibold cursor-pointer transition-colors"
                            onClick={() => openModal(post)}
                        >
                            OPEN
                        </button>

                        {/* Top-left corner border */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-300"></div>

                        {/* Bottom right corner border */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-300"></div>
                    </div>
                ))}
            </div>

            {/* Modal for full content */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-around z-50" onClick={closeModal}>
                    <div className="bg-slate-950 w-full max-w-3xl h-[80vh] m-4 rounded-lg p-6 flex flex-col relative" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 text-2xl font-bold text-white hover:text-gray-300" onClick={closeModal}>×</button>

                        <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted">{selectedPost.title}</h2>

                        {/* Document viewer container */}
                        <div className="flex-1 overflow-y-auto mb-4 prose max-w-none text-white">
                            {isLoading && (
                                <div className="text-center py-4">
                                    <span className="animate-pulse text-white">Loading document...</span>
                                </div>
                            )}
                            {error && (
                                <div className="text-red-500 py-4">{error}</div>
                            )}
                            {!isLoading && !error && contentLoaded && (
                                <div ref={canvasContainerRef} className="p-4" />
                            )}
                        </div>

                        {/* Download button */}
                        <a
                            href={selectedPost.filePath}
                            download
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-center"
                        >
                            Download {selectedPost.fileType.toUpperCase()}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}