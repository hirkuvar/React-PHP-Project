<?php

namespace App\Controller;
    
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;
    
class DefaultController extends AbstractController
{
    public $dataList;
    public $searchInput = '';

    public function __constructor(){
        $this->dataList = [];
    }
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('default/index.html.twig');
    }

     /**
     * @Route("/api/users", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsers()
    {
        $url = 'https://swapi.dev/api/people/';
        $resetList = true; 

        $userData = self::getDataFromApi($url, $resetList);
 
        $response = new Response();
        $response->setContent(json_encode($userData));
        return $response;
    }

    /**
     * @Route("/api/planets", name="planets")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getPlanets()
    {
        $url = 'https://swapi.dev/api/planets/';
        $resetList = true;

        $planetsData = self::getDataFromApi($url, $resetList);
    
        $response = new Response();
        $response->setContent(json_encode($planetsData));
        return $response;
    }

    /**
     * @Route("/api/starships", name="starships")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getStarships()
    {
        $url = 'https://swapi.dev/api/starships/';
        $resetList = true;

        $starshipsData = self::getDataFromApi($url, $resetList);

        $response = new Response();
        $response->setContent(json_encode($starshipsData));
        return $response;
    }

    public function getDataFromApi($url, $resetList) 
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf=8']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_POST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        curl_close($ch);

        $decodedResponse = json_decode($response, true);

        if (!empty($decodedResponse['results'])) {
            if ($resetList) {
                $this->dataList = [];
            }

            $this->dataList = array_merge($this->dataList, $decodedResponse['results']);
        }
        
        if (!empty($decodedResponse['next'])) {
            $url = $decodedResponse['next'];
            $resetList = false;
            self::getDataFromApi($url, $resetList);
        }

        return $this->dataList;
    }
    
}