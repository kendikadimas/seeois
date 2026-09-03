<?php

namespace App\Services;

use App\Models\MenuItem;
use App\Models\MenuStockMovement;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class MenuInventoryService
{
    public function adjust(MenuItem $menu, int $change, ?int $userId, string $reason, ?string $notes = null, ?string $requestId = null): MenuItem
    {
        return DB::transaction(function () use ($menu, $change, $userId, $reason, $notes, $requestId) {
            if ($requestId && MenuStockMovement::where('request_id', $requestId)->exists()) {
                return $menu->fresh();
            }

            $locked = MenuItem::query()->lockForUpdate()->findOrFail($menu->id);
            $before = (int) $locked->stock;
            $after = $before + $change;
            if ($after < 0) {
                throw ValidationException::withMessages(['amount' => "Stok {$locked->name} tidak mencukupi."]);
            }

            $locked->update(['stock' => $after]);
            MenuStockMovement::create([
                'menu_id' => $locked->id, 'user_id' => $userId, 'request_id' => $requestId,
                'change' => $change, 'stock_before' => $before, 'stock_after' => $after,
                'reason' => $reason, 'notes' => $notes,
            ]);

            return $locked;
        });
    }
}
