<?php
	$__stagingDomains = array("stage1.mydomain.com", "stage2.mydomain.com");
	$__prodDomain = "https://mydomain.com";
    $__currentdomain = $_SERVER['HTTP_HOST'];
    $__isStage = false;

	foreach($__stagingDomains as $__sd){
        if(strpos($__currentdomain, $__sd) !== false){
            $__isStage= true;
        }
    }
	if($__isStage){?>

        <link rel="canonical" href="<?php echo $__prodDomain; ?>">
        <meta name="robots" content="noindex">
        <meta name="googlebot" content="noindex">
        
    <?php }	?>