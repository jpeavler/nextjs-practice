import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    //First, grab all the file names under the posts folder.
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, ''); //remove the .md at the end of the file name to make the name an identifier
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8'); //read the markdown file as a string
        const matterResult = matter(fileContents)   //gray matter reading the metadata in the markdown file
        return {
            id, 
            ...matterResult.data
        };  //combine id with meta data.
    });
    return allPostsData.sort((a,b) => { //return all of the posts sorted by date
        if(a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    //returns an array of objects with property params: an object with an id describing the file name without the .md
    return fileNames.map(fileName => {
        return {
            params : {
                id : fileName.replace(/\.md$/, "")
            }
        }
    });
}
/* Important: The returned list is not just an array of strings 
— it must be an array of objects following this exact format. 
Each object must have the params key and contain an object with the 
id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.*/

export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
        id, 
        ...matterResult.data
    }
}