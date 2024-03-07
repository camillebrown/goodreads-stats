export const filterSearchResults = (results) =>{
    const clean = results.filter(r=>{
        console.log((r.want_to_read_count || r.already_read_count) > 5)
        return (r.want_to_read_count || r.already_read_count) > 5
    })
    return clean;
}