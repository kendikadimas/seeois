<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class YearController extends Controller
{
    public function set(Request $request)
    {
        $validated = $request->validate([
            'year' => ['required', 'integer', 'min:2000', 'max:' . (now()->year + 1)],
        ]);

        $request->session()->put('selected_year', (int) $validated['year']);

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => 'Tahun aktif diubah menjadi ' . $validated['year'] . '.',
        ]);
    }
}
