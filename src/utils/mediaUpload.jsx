import { createClient } from "@supabase/supabase-js"

const url="https://gckhnrdxgunvsirllydw.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdja2hucmR4Z3VudnNpcmxseWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjY1NTcsImV4cCI6MjA2Mzg0MjU1N30.ZwdF-PYMRewPpp-YErUl0h8ZV30-oGOYG0X2Yod61Iw"

    
const supabase=createClient(url,key)

export default function mediaUpload(file){


    const mediaUploadPromise=new Promise(

        (resolve,reject)=>{

            if(file==null){
                reject("no file selected")
                return
            }

            const  timestamp=new Date().getTime()
            const newName=timestamp+file.name


            supabase.storage.from("images").upload(newName,file,
            {
                upsert:false,
                cacheControl:"3600"
            }
        ).then(()=>{
            const publicUrl=supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
           console.log(publicUrl)
           resolve(publicUrl)
       
        }).catch(
            (e)=>{
                console.log(e)
                reject("error Occured in supabase coonection")
        }
        )


        }


    )

    return mediaUploadPromise

}
