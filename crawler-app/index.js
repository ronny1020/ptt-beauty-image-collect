import axios from 'axios'
import cheerio from 'cheerio'
// import fs from 'fs'

const url = 'https://www.ptt.cc/bbs/Beauty/M.1603022191.A.5BE.html'

async function run() {
  const { data } = await axios.request({
    url: url,
    method: 'get',
    headers: {
      Cookie: 'over18=1'
    }
  })
  const $ = cheerio.load(data)
  const image_url_list = $('a[target="_blank"]')

  const image_url_list_keys = Object.keys(image_url_list)

  image_url_list_keys.forEach(key => {
    let imageUrl
    if (!image_url_list[key] || !image_url_list[key].attribs) return
    else imageUrl = image_url_list[key].attribs.href

    if (imageUrl.endsWith('jpg') || imageUrl.endsWith('jpeg') || imageUrl.endsWith('png')) {
      console.log(imageUrl)
    }
  })
}

run()
