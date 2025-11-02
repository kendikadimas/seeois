<?php

namespace App\Exceptions;

use Throwable;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
  /**
   * A list of exception types that are not reported.
   */
  protected $dontReport = [
    //
  ];

  /**
   * A list of inputs that are never flashed to the session on validation exceptions.
   */
  protected $dontFlash = [
    'current_password',
    'password',
    'password_confirmation',
  ];

  /**
   * Register the exception handling callbacks for the application.
   */
  public function register(): void
  {
    $this->reportable(function (Throwable $e) {
      //
    });
  }

  /**
   * Render an exception into an HTTP response.
   */
  public function render($request, Throwable $exception)
  {
    if ($request->header('X-Inertia')) {
      // Handle 404 Not Found
      if ($exception instanceof NotFoundHttpException) {
        return Inertia::render('Errors/Default', [
          'status' => 404
        ])
          ->toResponse($request)
          ->setStatusCode(404);
      }

      // Handle generic HTTP errors (e.g., 500)
      if ($exception instanceof HttpExceptionInterface) {
        $status = $exception->getStatusCode();
        return Inertia::render("Errors/Default", [
          'status' => $status,
          'message' => $exception->getMessage(),
        ])->toResponse($request)->setStatusCode($status);
      }

      // Fallback for unhandled exceptions
      return Inertia::render('Errors/500', [
        'message' => config('app.debug') ? $exception->getMessage() : 'Server Error',
      ])->toResponse($request)->setStatusCode(500);
    }

    return parent::render($request, $exception);
  }

  /**
   * Handle unauthenticated user.
   */
  protected function unauthenticated($request, AuthenticationException $exception)
  {
    if ($request->expectsJson() || $request->header('X-Inertia')) {
      return response()->json(['message' => 'Unauthenticated'], 401);
    }

    return redirect()->guest(route('login'));
  }
}
