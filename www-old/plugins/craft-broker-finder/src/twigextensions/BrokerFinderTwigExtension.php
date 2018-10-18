<?php
//
// Broker Finder plugin for Craft CMS 3.x
//
// An easy way to figure out the prices of all options brokers.
//
// @link      https://cloudmanic.com
// @copyright Copyright (c) 2017 Cloudmanic Labs, LLC
//

namespace cloudmanic\brokerfinder\twigextensions;

use cloudmanic\brokerfinder\BrokerFinder;

use Craft;

//
// @author    Spicer Matthews
// @package   BrokerFinder
// @since     1.0.0
//
class BrokerFinderTwigExtension extends \Twig_Extension
{
  private $_brokers = [];
  
  //
  // Returns the name of the extension.
  //
  // @return string The extension name
  //
  public function getName()
  {
    return 'BrokerFinder';
  }

  //
  // Returns an array of Twig functions, used in Twig templates via:
  // 
  // {% set this = brokerFinder(brokers) %}
  // 
  // @return array
  //
  public function getFunctions()
  {
    return [
      new \Twig_SimpleFunction('getBrokerFinderData', [ $this, 'getBrokerFinderData' ]),
    ];
  }

  //
  // Our function called via Twig to return 
  // the data for 
  //
  public function getBrokerFinderData($brokers)
  {
    $rt = [];
    
    // First we loop through the broker we passed in and load up our internal var.
    foreach($brokers AS $key => $row)
    {
      $this->_brokers[$row->title] = [
        'ticket_charge' => $row->brokersTicketCharge, 
        'per_option' => $row->brokersPerOptionCharge, 
        'per_leg' => $row->brokersChargePerLeg, 
        'url' => $row->brokersWebsiteUrl
      ];
    }
    
    // Process the request.
    if(isset($_GET['strategy']) && isset($_GET['lots']))
    {
      $rt = $this->_order_brokers();
    }
    
    // Return the data.
    return $rt;
  }
  
	// -------------------- Private Helper Functions -------------------- //
	
	//
	// Return the brokers in order of price.
	//
	private function _order_brokers()
	{
		$rt = [];
		$price_index = [];		
		$strategy = (isset($_GET['strategy'])) ? $_GET['strategy'] : ''; 
		$lots = (isset($_GET['lots'])) ? $_GET['lots'] : '';
		
		// Figure out leg information.
		switch($strategy)
		{
			case 'buy-options':
			case 'write-options':			
				$legs = 1;
			break;
			
			case 'vertical-spread':	
				$legs = 2;
			break;
			
			case 'iron-condor':	
				$legs = 4;
			break;						
		}	
		
		// Figure out price per broker.
		foreach($this->_brokers AS $key => $row)
		{
			// Figure out price based on strategy
			if($row['per_leg'])
			{
				$this->_brokers[$key]['ticket_charge'] = ($row['ticket_charge'] * $legs); 
				$this->_brokers[$key]['per_option'] = ($row['per_option'] * ($lots * $legs)); 				
				$price_index[$key] = ($row['ticket_charge'] * $legs) + ($row['per_option'] * ($lots * $legs));
			} else
			{
				$this->_brokers[$key]['per_option'] = ($row['per_option'] * ($lots * $legs)); 				
				$price_index[$key] = $row['ticket_charge'] + ($row['per_option'] * ($lots * $legs));				
			}
			
			// Special case: Interactive Brokers
			if(($key == 'Interactive Brokers') && ($price_index[$key] < 1))
			{
				$price_index[$key] = 1.00;
			}
			
			// Special case: Tradier Brokerage
			if($key == 'Tradier Brokerage **')
			{	
  			if(($price_index[$key] < 5) && ($legs == 1))
  			{
				  $price_index[$key] = 5.00;
        }
        
  			if(($price_index[$key] < 7) && ($legs >= 2))
  			{
				  $price_index[$key] = 7.00;
        }        
			}			
		}

		// Sort of lowest to highest.		
		asort($price_index);

		// Build object to pass to the view. 
		foreach($price_index AS $key => $row)
		{
			$rt[] = [
				'name' => $key,
				'ticket_charge' => number_format($this->_brokers[$key]['ticket_charge'], 2),
				'per_option' => number_format($this->_brokers[$key]['per_option'], 2),		
				'url' => $this->_brokers[$key]['url'],
				'total_cost' => number_format($row, 2)
			];
		}
		
		// Return sorted data.
		return $rt;
	}  
}

/* End File */