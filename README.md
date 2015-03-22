# LivingDocs for SilverStripe

This is a first draft of a LivingDocs Field for SilverStripe. It basically contains no functionality.

*See it on video here:* [https://vimeo.com/122740856](https://vimeo.com/122740856).

Roadmap: https://trello.com/b/Ha2cQI1B/livingdocsfield-silverstripe

## What it does

Currently the field is displaying some default content from Living Docs. Upon pressing the save button, 
the content of the field is written as HTML to a hidden textarea field which is then saved in the DB.
To open the Editor again, the content is also saved as JSON serialization in the Content_raw field (that, by the way, doesn't work just yet, because the submit is never triggered?).

## Using it

Currently your `Page.php` should look like this:

```
class Page extends SiteTree {

	private static $db = array(
		"Content_raw" => "Text"
	);

	private static $has_one = array(
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$ld = new LivingDocsField("Content");
		$ld->addExtraClass("stacked");
		
		// You can hide this, too...
		$raw_field = new TextField("Content_raw");
		
		$fields->addFieldToTab("Root.Main", $ld, "Metadata");
		$fields->addFieldToTab("Root.Main", $raw_field, "Metadata");
		return $fields;
	}
}
```

## Support the development

Please help with developing this form field. I hope the video of the demo showed enough to
convince everyone that it's a worthwile endeavour. 

For the curious, the ToDo's for this project are hosted here: https://trello.com/b/Ha2cQI1B/livingdocsfield-silverstripe .

Please let me know if anything is needed, contact: w.vollprecht@gmail.com
