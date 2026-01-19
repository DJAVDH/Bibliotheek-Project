<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;

class TestController extends AbstractController
{
    #[Route('/test-db', name: 'test_database')]
    public function testDatabase(Connection $connection): Response
    {
        try {
            // Get database info before attempting query
            $params = $connection->getParams();
            
            // Try to execute a simple query
            $result = $connection->executeQuery('SELECT 1 as success');
            $data = $result->fetchAssociative();
            
            return new Response(
                '<h1>Database Connection Test</h1>' .
                '<p style="color: green; font-size: 18px;"><strong>✓ Database connection successful!</strong></p>' .
                '<p><strong>Database:</strong> ' . ($params['dbname'] ?? 'N/A') . '</p>' .
                '<p><strong>Host:</strong> ' . ($params['host'] ?? 'N/A') . '</p>' .
                '<p><strong>User:</strong> ' . ($params['user'] ?? 'N/A') . '</p>' .
                '<p><strong>Driver:</strong> ' . ($params['driver'] ?? 'N/A') . '</p>' .
                '<p><a href="/">Back to home</a></p>',
                Response::HTTP_OK,
                ['Content-Type' => 'text/html']
            );
        } catch (\Exception $e) {
            return new Response(
                '<h1>Database Connection Test</h1>' .
                '<p style="color: red; font-size: 18px;"><strong>✗ Database connection failed!</strong></p>' .
                '<p><strong>Error:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>' .
                '<p><strong>Error Code:</strong> ' . htmlspecialchars($e->getCode()) . '</p>' .
                '<details><summary>Full Stack Trace</summary><pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre></details>' .
                '<p><a href="/">Back to home</a></p>',
                Response::HTTP_INTERNAL_SERVER_ERROR,
                ['Content-Type' => 'text/html']
            );
        }
    }
}
