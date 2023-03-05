<?php
$baseUrl = "https://options.cafe";
$rss_xml = file_get_contents("data/blogs.xml");
$rss_obj = simplexml_load_string($rss_xml);

// You can now access the elements of the RSS feed using the object syntax

//echo "Title: " . $rss_obj->channel->title . "<br>";
//echo "Description: " . $rss_obj->channel->description . "<br>";

// Loop through the items in the RSS feed and output the title and link of each item

//echo '<pre>' . print_r($rss_obj->channel->item, true) . '</pre>';

foreach ($rss_obj->channel->item as $item) {
    $file_title = str_replace($baseUrl . '/blog/', '', $item->link) . ".html";

    $image =  strstr(str_replace("https://cdn.options.cafe/", "", $item->image), "?", true);

    $page = "---\n";
    $page .= "title: \"" . $item->title . "\"\n";
    $page .= "date: " . date('Y-m-d\TH:i:sP', strtotime($item->pubDate)) . "\n"; // 2020-06-10T01:18:58-07:00
    $page .= "draft: false\n";
    $page .= "author: \"$item->author\"\n";
    $page .= "categories: [\"$item->category\"]\n";
    $page .= "image: \"" . $image . "\"\n";
    $page .= "description: \"" . trim($item->blogDesc) . "\"\n";

    $page .= "blog_tags: [\n";
    foreach ($item->tags->item as $row) {
        $page .= "\"" . $row->title . "\"," . "\n";
    }
    $page .= "]\n";

    $page .= "must_reads: [\n";
    foreach ($item->mustReads->item as $row) {
        $page .= "\"" . str_replace($baseUrl . '/blog/', '', $row->url) . "\"," . "\n";
    }
    $page .= "]\n";


    $page .= "---\n";

    $page .= trim($item->description);

    //echo $item->blogDesc . "\n";

    // echo $file_title . "\n";

    // echo $item->title . "\n";
    // echo $item->link . "\n";
    // echo $item->image . "\n";
    // echo $item->pubDate . "\n";
    // echo $item->author . "\n";
    // echo $item->category . "\n";
    // echo trim($item->summary) . "\n";
    // echo trim($item->description) . "\n";


    // foreach ($item->mustReads->item as $row) {
    //     echo $row->title . "\n";
    //     echo $row->url . "\n";
    // }

    // foreach ($item->tags->item as $row) {
    //     echo $row->title . "\n";
    //     echo $row->url . "\n";
    // }
    //die();

    file_put_contents("../content/blog/$file_title", $page);
    file_put_contents("../layouts/partials/blog/summaries/$file_title", trim($item->summary));
}
