# Proxy Tester

Open source web application to check whether a proxy server is transparent, anonymous or elite anonymous

### What are transparent, anonymous or elite anonymous proxies?
* Transparent - Proxy server exposes your real IP to websites you visit
* Anonymous - Proxy server does not expose your real IP, but indicates to websites you visit that you are using a proxy
* Elite Anonymous - Proxy server hides your IP and the fact that you are using a proxy

To find a list of free proxy servers to test out their anonymity, you can find them [here](https://proxy-list.org/english/index.php)

### How It Works
1. User enter a proxy server's IP/hostname and port
2. Server attempts to browse a website that we control through that proxy
3. Server checks the http request headers forensic to see whether there is any identity leak

### Disclaimer
This webapp is completed in a short amount of time, and it is not thoroughly tested yet. It might still contain some bug..
