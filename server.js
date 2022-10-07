import { serve } from "https://deno.land/std@0.157.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.157.0/http/file_server.ts"

serve (handler, { port: 80 })

function handler (req) {

    const options = {
        fsRoot: `public`
    }

    if (req.url.endsWith (`/`)) {
        const aug_req = new Request (`${ req.url }index.html`, req)
        return serveDir (aug_req, options)
    }

    return serveDir (req, options)
}