function matrix(n, m) {
    var mat = new Array(n);
    for (var i = 0; i < n; i++) {
        mat[i] = new Array(m);
    }
    return mat;
}

function argmin(vals) {
    var min = 0;
    for (var i = 1; i < vals.length; i++) {
        if (vals[i] < vals[min]) {
            min = i;
        }
    }
    return min;
}

function align(fst, snd) {
    var n = fst.length;
    var m = snd.length;

    // edit distance matrix
    var dist = matrix(n + 1, m + 1);
    // indices to strings where the chars are equal
    var equal = [];

    // NOTE: these weights must be set in a way that they build such tables which lead to alignments
    //       corresponding to actual rules transformations performed by tipograph
    var ins = 3;
    var del = 1;
    var sub = 3;

    // set the "trivial" cells
    dist[0][0] = 0;

    for (var k = 0; k < m; k++) {
        dist[0][k + 1] = dist[0][k] + ins;
    }

    for (var l = 0; l < n; l++) {
        dist[l + 1][0] = dist[l][0] + del;
    }

    // build the table
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (fst[i] === snd[j]) {
                dist[i + 1][j + 1] = dist[i][j];
                equal.push([i, j]);
            } else {
                // d_del, d_sub, d_ins
                var dists = [dist[i][j + 1] + del, dist[i][j] + sub, dist[i + 1][j] + ins];
                var min = argmin(dists);
                dist[i + 1][j + 1] = dists[min];
            }
        }
    }

    if (equal.length === 0) {
        // no characters are equal
        return null;
    } else {
        // find the indices whose characters have the minimal distance
        var out = argmin(equal.map(function (coords) {
            return dist[coords[0] + 1][coords[1] + 1];
        }));

        return equal[out];
    }
}

export function find(original, converted) {
    // add sentinel chars which always match each other
    original += '\0';
    converted += '\0';

    var changes = [];
    var i = 0;
    var j = 0;
    while (i < original.length && j < converted.length) {
        if (original[i] == converted[j]) {
            i++;
            j++;
        } else {
            var alignment;
            // NOTE: this bound must be large enough to cover the longest rule transformation
            var bound = 10;

            // NOTE: this loop is guaranteed to terminate because of '\0's at the ends
            do {
                alignment = align(original.slice(i, i + bound), converted.slice(j, j + bound));
                bound *= 2;
            } while (alignment === null);

            changes.push([[i, i + alignment[0]], [j, j + alignment[1]]]);
            i += alignment[0] + 1;
            j += alignment[1] + 1;
        }
    }

    return changes;
}
