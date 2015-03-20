(function($) {
$(document).ready(function() {

	// Load the design
	doc.design.load(design.boilerplate);

	// Create the document
	// var json = {}
	// if( $(".livingdocs_textfield_raw")[0].val() ) {
	// 	json = JSON.parse($(".livingdocs_textfield_raw")[0].val())
	// }
	var name = $($(".livingdocs_textfield")[0]).attr("name");
	console.log(name)
	var json_content = $("#" + name + "_raw").val();
	console.log(json_content)
	var parsed_json = null;
	try {
		parsed_json = JSON.parse(json_content)
	} catch (err) {
		console.log("no parsable json found")
	}
	console.log(parsed_json)
	var article = null;
	console.log(article)
	if(parsed_json) {
		article = doc.new(parsed_json);
	} else {
		var article = doc.new({
			data: {
				content: [
					{
						"component": "hero",
						"content": { "title": "History Is Water Under The Bridge" }
					},
					{
						"component": "p", "content": { "text": "On February 1, 2008, Toshio Suzuki stepped down from the position of Studio Ghibli president, which he had held since 2005, and Koji Hoshino (former president of Walt Disney Japan) took over. Suzuki said he wanted to improve films with his own hands as a producer, rather than demanding this from his employees. Suzuki decided to hand over the presidency to Hoshino because Hoshino has helped Studio Ghibli to sell its videos since 1996, also helping to release the Princess Mononoke film in the United States. Suzuki still serves on the company’s board of directors." }
					},
					{
						"component": "main-and-sidebar",
						"containers": {
							"main": [
								{
									"component": "h2",
									"content": { "title": "Understanding The Present Means Understanding Titles" }
								},
								{
									"component": "p", "content": { "text": "Studio Ghibli has produced nineteen feature films, several short films, television commercials, and a television film. Eight of Studio Ghibli’s films are among the 15 highest-grossing anime films made in Japan, with Spirited Away being the highest, grossing over $274 million worldwide." }
								},
								{ "component": "panel" }
							],
							"sidebar": [
								{ "component": "quote" },
								{
									"component": "list-group",
									"containers": {
										"list": [
											{ "component": "list-group-item" },
											{ "component": "list-group-box-item" }
										]
									}
								}
							]
						}
					}
				],
				design: {
					name: 'boilerplate'
				}
			}
		});
	}

	// Insert the article into the page
	article.appendTo( {host: '.livingdocs_EditorField',
		interactive: true,
		loadResources: true
	});

	// console.log($(".livingdocs_textfield").parents("form"));
	$(".livingdocs_textfield").parents("form").on("beforesubmitform", function() {
		// var name = $(".livingdocs_textfield")[0].attr("name");
		console.log(article.toHtml())
		$($(".livingdocs_textfield")[0]).val(article.toHtml());
		var name = $($(".livingdocs_textfield")[0]).attr("name")
		$("#Form_EditForm_" + name + "_raw").val(article.toJson());
	});

});
})(jQuery);