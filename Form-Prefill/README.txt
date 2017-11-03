This JS automatically pre-fills Marketo forms without using any API requests.
Implementation steps:
1. Create a Marketo landing page and insert a form that contains the same fields that you'd like to prefill.
2. Copy this form landing page URL and replace the pageUrl (currently: "http://info.yourdomain.com/form-Prefill")
3. Install the script at the end of the original landing page as the last script on the page (before the </body>). 
Alternativly, you can use  MktoForms2.whenReady to run this script after the forms completly loaded - see: http://developers.marketo.com/rest-api/assets/forms/examples/

Notes:
# Requires jQuery to be installed on the page - otherwise it won't run
# Supports multiple embedded forms on the same page
# It's recommended to use the minified version (Form-Prefill.min.js)

--------------
Copyright (c) 2017, Yanir Calisar, Tel Aviv, Israel (ycalisar at gmail.com)
Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. 
We suggest citation in publications as with any code developement work. No warrantee is given.
Please help improve the code by sending suggestions or new code back.
 