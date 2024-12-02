
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/myFlix-Angular/welcome",
    "route": "/myFlix-Angular"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular/welcome"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular/movies"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/myFlix-Angular/welcome",
    "route": "/myFlix-Angular/**"
  }
],
  assets: new Map([
['index.csr.html', {size: 8150, hash: 'dd846e242a8626004c0e1b490922cf34f3d5137d726106df25783386bd5a1984', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1675, hash: '3ea4b1e6dc6aca51fec6e75a4934b0e756fab94ae4c14c099525f5442a164ec6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['welcome/index.html', {size: 30938, hash: '6041eabb0e349162f0c1b18669ffab653055b75793788f8e85014e87aa85b952', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)}], 
['movies/index.html', {size: 29384, hash: 'cd05d83e4e3029a3222767c1ad0c5d8c58d411913c3f3ac397c189afd7b2ab74', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)}], 
['profile/index.html', {size: 94030, hash: 'a6b01ce960f1bdf44a07283fbff4b6394b3386fc92b64e630b24290c9e1ed01e', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)}], 
['styles-E7MZGFKC.css', {size: 7099, hash: 'sPTHma6wxy0', text: () => import('./assets-chunks/styles-E7MZGFKC_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
