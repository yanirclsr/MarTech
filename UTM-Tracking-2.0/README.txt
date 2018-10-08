UTM Capturing and Storing in Cookies
------------------------------------

This Javascript code automatically captures UTM paramters of your website visitors.
It captures multi touch interactions and storing the data in the browser cookies for 2 years
Source code: UTM-Tracking-2.0.js
Minified version: UTM-Tracking-2.0.min.js


To capture the touchpoints and extract to your form - first create a long text field and add it to the form as a hidden field.
Use the capture from cookie functionality to retrieve the value for the "__mt_attribution" cookie.
This cookie will contain all the touchpoints the visitor had during the journey, with :: as the separator between each session.
Example:
TS=153901858&R=google.com&U=ads&M=cpc&N=campaign1&T=myterm&C=campaignContent::TS=1539018587175&U=src2&M=med2&N=cmp2&T=trm2&C=cntn2::

Touchpoint metadata:
TS - timestamp
R - Referrer
S - UTM Source
M - UTM Medium
N - UTM Campaign name
T - UTM term
C - UTM content

You can leverage our marketing attribution connector to automatically parse this data and record it in your CRM or Marketing Automation platform.
Contact us at info@overstack.io


Disclaimer:
/*
 * Copyright (c) 2018, Yanir Calisar (ycalisar at overstack.io)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. 
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */


