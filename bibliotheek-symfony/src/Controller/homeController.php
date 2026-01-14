<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;


class homeController extends AbstractController
{
    #[Route('/home', name: 'home')]
    public function index(): Response
    {
        $genres = ['Fiction', 'Non-Fiction', 'Science', 'History'];
        return $this->render('home.html.twig', [
            'genres' => $genres,
        ]);
    }
}
