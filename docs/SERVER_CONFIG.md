# Production Server Configuration for Sitemap

To ensure the sitemap.xml file is properly served in production, please configure your web server with the following:

## Nginx Configuration
```nginx
location /sitemap.xml {
    types { }
    default_type "application/xml";
    alias /path/to/your/build/sitemap.xml;
}
```

## Apache Configuration
```apache
<Files "sitemap.xml">
    ForceType application/xml
</Files>
```

## Required Headers
Ensure your server sends these headers for XML files:
- Content-Type: application/xml
- Access-Control-Allow-Origin: * (if needed)

## Verification
After deployment, verify the sitemap is accessible by:
1. Visiting https://usataxcalculator.info/sitemap.xml directly
2. Checking the response headers contain `Content-Type: application/xml`
3. Using Google Search Console to resubmit the sitemap
