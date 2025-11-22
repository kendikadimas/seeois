<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Stand;
use App\Services\ProfitCalculator;

class RecalculateStandProfit extends Command
{
    protected $signature = 'stand:recalc-profit {--force-legacy : Force legacy formula income-expense when no recipe data}';

    protected $description = 'Recalculate profit for all stands using recipe-based COGS when available.';

    public function handle(): int
    {
        $count = 0;
        $updated = 0;
        $this->info('Starting profit recalculation...');
        foreach (Stand::with(['menu'])->cursor() as $stand) {
            $count++;
            $calc = ProfitCalculator::calculateStandProfit($stand->id);
            if ($calc !== null) {
                $stand->profit = $calc;
            } elseif ($this->option('force-legacy')) {
                $stand->profit = $stand->income - $stand->expense; // ensure synced
            } else {
                // skip update when no recipe data and not forcing legacy refresh
                continue;
            }
            $stand->save();
            $updated++;
            $this->line('['.$stand->id.'] '.$stand->name.' -> '.$stand->profit);
        }
        $this->info('Processed stands: '.$count.' | Updated profits: '.$updated);
        return Command::SUCCESS;
    }
}
