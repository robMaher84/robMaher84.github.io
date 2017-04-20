<?php
// If you are using an old version of php, remove the next set of lines.
// or use $HTTP_POST_VARS["..."] instead.
$Submit 	= $_POST["Submit"];
$Name 		= $_POST["Name"];
$Email 		= $_POST["Email"];
$Website 	= $_POST["Website"];
$Comments 	= $_POST["Comments"];
$NumLow 	= $_REQUEST["NumLow"];
$NumHigh 	= $_REQUEST["NumHigh"];

// Replace special characters - you can remove the next 5 lines if wanted.
$Name 		= ereg_replace("[^A-Za-z0-9 ]", "", $Name);
$Email 		= ereg_replace("[^A-Za-z0-9 \@\.\-\/\']", "", $Email);
$Comments	= ereg_replace("[^A-Za-z0-9 \@\.\-\/\']", "", $Comments);
$Website 	= eregi_replace("http://", "", $Website);
$Website 	= ereg_replace("[^A-Za-z0-9 \@\.\-\/\'\~\:]", "", $Website);

// Remove slashes.
$Name 		= stripslashes($Name);
$Email 		= stripslashes($Email);
$Website 	= stripslashes($Website);
$Comments 	= stripslashes($Comments);

// ###################################################################################
// ########## Reading and Writing the new data to the GuestBook Database #############

if ($Submit == "Yes") {
// Next line tells the script which Text file to open.
	$filename 	= "GuestBook.txt";

// Opens up the file declared above for reading 

	$fp 		= fopen( $filename,"r"); 
	$OldData 	= fread($fp, 80000); 
	fclose( $fp ); 

// Gets the current Date of when the entry was submitted
	$Today 		= (date ("l dS of F Y ( h:i:s A )",time()));

// Puts the recently added data into html format that can be read into the Flash Movie.
// You can change this up and add additional html formating to this area.  For a complete listing of all html tags
// you can use in flash - visit: http://www.macromedia.com/support/flash/ts/documents/htmltext.htm

	$Input = "Name: <b>$Name</b><br>Email: <b><u><a href=\"mailto:$Email\">$Email</a></u></b><br>Website: <b><u><a href=\"http://$Website\" target=\"_blank\">$Website</a></u></b><br>Comments: <b>$Comments</b><br><i><font size=\"-1\">Date: $Today</font><br><br>.:::.";

/* This Line adds the '&GuestBook=' part to the front of the data that is stored in the text file.  This is important because without this the Flash movie would not be able to assign the variable 'GuestBook' to the value that is located in this text file  */

	$New = "$Input$OldData";

// Opens and writes the file.

	$fp = fopen( $filename,"w"); 
	if(!$fp) die("&GuestBook=cannot write $filename ......&");
	fwrite($fp, $New, 800000); 
	fclose( $fp ); 
}

// ###################################################################################
// ######### Formatting and Printing the Data from the Guestbook to the Flash Movie ##



// Next line tells the script which Text file to open.
	$filename = "GuestBook.txt";

// Opens up the file declared above for reading 

	$fp 	= fopen( $filename,"r"); 
	$Data 	= fread($fp, 800000); 
	fclose( $fp );

// Splits the Old data into an array anytime it finds the pattern .:::.
	$DataArray = split (".:::.", $Data);

// Counts the Number of entries in the GuestBook
	$NumEntries = count($DataArray) - 1;

	print "&TotalEntries=$NumEntries&NumLow=$NumLow&NumHigh=$NumHigh&GuestBook=";
	for ($n = $NumLow; $n < $NumHigh; $n++) {
	print $DataArray[$n];
		if (!$DataArray[$n]) {
			Print "<br><br><b>No More entries</b>";
		exit;
		}
	}
?>
