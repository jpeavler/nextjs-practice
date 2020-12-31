import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    //First, grab all the file names under the posts folder.
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, ''); //remove the .md at the end of the file name to make the name an identifier
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8'); //read the markdown file as a string
        const matterResult = matter(fileContents)   //gray matter reading the metadata in the markdown file
        console.log(matterResult);
        return {id, ...matterResult.data};  //combine id with meta data.
    });
    return allPostsData.sort((a,b) => { //return all of the posts sorted by date
        if(a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
    
}