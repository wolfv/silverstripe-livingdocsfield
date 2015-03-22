(function($) {

$.entwine('ss', function($){
	// Load the design
	function loadLivingDocs() {
		var selected_design = "boilerplate";	

		design[selected_design].assets.basePath = $(".livingdocs_EditorField").first().data("baseurl") + "/js/design/src/";
		doc.design.load(design[selected_design]);

		doc.config({livingdocsCssFile: "livingdocsfield/js/bower_components/livingdocs-engine/dist/css/livingdocs.css"});

		// Create the document
		var name = $($(".livingdocs_textfield")[0]).attr("name");
		var json_content = $("#Form_EditForm_" + name + "_raw").val();
		var parsed_json = null;
		try {
			parsed_json = JSON.parse(json_content)
		} catch (err) {
			console.log("no parsable json found")
		}


		var article = null;
		if(parsed_json) {
			article = doc.new({data : parsed_json});
		} else {
			article = doc.new({
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

		var ready = article.createView({
			interactive: true, 
			iframe: true, 
			host: ".livingdocs_EditorField_Editor", 
			wrapper: doc.design.designs[selected_design].wrapper
		})
		// console.log(ready)
		ready.then(function() {



		$host = $(".livingdocs_EditorField_Editor")

	    var $toolbar = $('.livingdocs_EditorField_Toolbar');

	    for (var i = 0; i < doc.design.designs["boilerplate"].components.length; i++) {
	      var template = doc.design.designs["boilerplate"].components[i];
	      $entry = $('<div class="toolbar-entry">');
	      $entry.html(template.label);
	      $toolbar.append($entry);
	      draggableComponent(doc, template.name, $entry);
	    }

		article.interactiveView.page.editableController.selection.add(function(view, editableName, selection) {
			$(".livingdocs_EditorField_Toolbar_textopts").remove()
		    var outer_el = $("<div>").addClass("livingdocs_EditorField_Toolbar_textopts")
			if(selection && selection.isSelection) {
				var offset = $host.offset()
				var rect = selection.getRects()[0]
				var $el = $("<button>").text("Add Link")
					.on('mousedown', function(e) { e.preventDefault() })
					.on('click', function() {
						selectLink(function(linkObj) {
							selection.link(linkObj.href, {target: linkObj.target, title: linkObj.title})
							selection.triggerChange()
						})
					}) 
				outer_el.append($el);
				var $el = $("<button>").text("Bold")
					.on('mousedown', function(e) { e.preventDefault() })
					.on('click', function() {
						selection.toggleBold()
						selection.triggerChange()
					})
				outer_el.append($el);
				var $el = $("<button>").text("Italic")
					.on("mousedown", function(e) { e.preventDefault() })
					.on('click', function() {
						selection.toggleEmphasis()
						selection.triggerChange();	
					}) 
				outer_el.append($el);
				$("button", outer_el)
				outer_el.css({position: "absolute", left: rect.left + offset.left, top: rect.top + offset.top - 40, background: "black", "z-index": 1000})
				$("body").append(outer_el)
			}
		})


	    article.interactiveView.page.focus.componentFocus.add(function(component) {
	    	$(".livingdocs_EditorField_Toolbar_options").remove()
	    	var options = $("<div>").addClass("livingdocs_EditorField_Toolbar_options")
	    	options.append("<h3>").text("Properties")

	    	for(s_id in component.model.template.styles) {
	    		var curr_style = component.model.template.styles[s_id];
	    		var el;
	    		switch(curr_style.type) {
	    			case "select":
	    				el = $("<select>")
	    				for(op_id in curr_style.options) {
	    					curr_op = curr_style.options[op_id];
	    					el.append($("<option>").val(curr_op.value).text(curr_op.caption))
	    				}
	    				el.on("change", function(value) {
	    					component.setStyle(curr_style.name, this.value)
	    				})
	    				break
	    			case "option":
	    				el = $("<input>").attr({type: 'checkbox'})
	    				el.on("change", function() {
	    					if(el.prop('checked'))
		    					component.setStyle(curr_style.name, curr_style.value)
		    				else 
		    					component.setStyle(curr_style.name, "")
	    				});
	    				el = $("<label>").text(curr_style.label).prepend(el)

	    			default:
	    				break;
	    		}
	    		options.append(el);
	    	}
	    	if(component.model.directives.image && component.model.directives.image.length) {
	    		for(directive_id in component.model.directives.image) {
	    			curr_img = component.model.directives.image[directive_id];
		    		$image_button = $("<button>").text("Select Image").on("click", function() {
		    			selectImage(function(src) {
			    			component.model.setContent(curr_img.name, {url: src});
		    			})
		    		})
		    		options.prepend($image_button)
	    		}
	    	}
	    	$toolbar.append(options)
	    	$delete_button = $("<button>").text("Delete Component").on("click", function() {
	    		component.model.remove()
	    		$(".livingdocs_EditorField_Toolbar_options").remove()

	    	})
	    	options.append($delete_button);
	    })

		var editor_template = {
			onopen: function() {

			},
			getSelectedNode: function() {
				return "<div>";
				return null;
			},
			getSelection: function() {
				return $("<div>");
			},
			createBookmark: function() {
				return null;
			},
			blur: function() {
			},
			onclose: function() {},
			moveToBookmark: function() {},
			replaceContent: function(HTML) {
				console.log(HTML)
			},
			repaint: function() {},
			insertContent: function() {},
			addUndo: function() {},
			insertLink: function() {}
		}
		var element = {
			getEditor: function() {
				return editor_template;
			}
		}

		window.selectImage = function(callback) {

			var $ = jQuery;
			var type =  "media";
			var url = $('#cms-editor-dialogs').data('url-mediaform');
			var dialog = $('.htmleditorfield-media-dialog');
			var editor = editor_template;
			editor.insertContent = function(content) {
				callback($(content).attr("src"));
			}
			if(dialog.length) {
				dialog.getForm().setElement(editor);
				dialog.open();
			} else {
				// Show a placeholder for instant feedback. Will be replaced with actual
				// form dialog once its loaded.
				dialog = $('<div class="htmleditorfield-dialog htmleditorfield-' + type + 'dialog loading">');
				$('body').append(dialog);
				$.ajax({
					url: url,
					complete: function() {
						dialog.removeClass('loading');
					},
					success: function(html) {
						dialog.html(html);
						dialog.entwine('ss').getForm().setElement(element);
						dialog.entwine('ss').trigger('ssdialogopen');
					}
				});
			}

			// jQuery('.htmleditorfield-dialog').entwine('ss').open()
		}

		window.selectLink = function(callback) {

			var $ = jQuery;
			var type =  "link";
			var url = $('#cms-editor-dialogs').data('url-linkform');
			var dialog = $('.htmleditorfield-link-dialog');
			var editor = editor_template;
			editor.insertLink = function(link) {
				callback(link);
			}
			if(dialog.length) {
				dialog.getForm().setElement(editor);
				dialog.open();
			} else {
				// Show a placeholder for instant feedback. Will be replaced with actual
				// form dialog once its loaded.
				dialog = $('<div class="htmleditorfield-dialog htmleditorfield-' + type + 'dialog loading">');
				$('body').append(dialog);
				$.ajax({
					url: url,
					complete: function() {
						dialog.removeClass('loading');
					},
					success: function(html) {
						dialog.html(html);
						dialog.entwine('ss').getForm().setElement(element);
						dialog.entwine('ss').getForm().setSelection("<div>");
						dialog.entwine('ss').trigger('ssdialogopen');
					}
				});
			}

			// jQuery('.htmleditorfield-dialog').entwine('ss').open()
		}


	    function draggableComponent (doc, name, $elem) {
	      $elem.on('mousedown', function(event) {
	        var newComponent = article.createComponent(name);
	        doc.startDrag({
	          componentModel: newComponent,
	          event: event,
	          config: {
	            preventDefault: true,
	            direct: true
	          }
	        });
	      });
	    }

		// $(".livingdocs_textfield").first().parents("form").on("submit", function() {
		// 	saveLivingdocs()
		// });
		window.article = article;

		var $html_field = $($(".livingdocs_textfield")[0])
		var name = $($(".livingdocs_textfield")[0]).attr("name")
		var $raw_field = $("#Form_EditForm_" + name + "_raw");
		function saveLivingdocs() {
			$html_field.val(article.toHtml())
			$raw_field.val(article.toJson())
		}
		article.model.changed.add(function() {
			saveLivingdocs()
		});
		
		// save living docs once, to prepopulate the Content (HTML) Field
		saveLivingdocs()

		})
	}

	// $(".cms-container .Actions").on("mousedown", function() {
	// 	saveLivingdocs()
	// })
	
	$(".cms-container").on("afterstatechange", function() {
		loadLivingDocs()
	})
	$(".cms-container").on("aftersubmitform", function() {
		loadLivingDocs()
	})

	loadLivingDocs()

})
})(jQuery);