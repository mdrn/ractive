import { test } from 'qunit';

[ true, false ].forEach( modifyArrays => {
	test( `ractive.splice() (modifyArrays: ${modifyArrays})`, t => {
		t.expect( 5 );

		const done = t.async();

		let items = [ 'alice', 'bob', 'charles' ];

		const ractive = new Ractive({
			el: fixture,
			template: `
				<ul>
					{{#items}}
						<li>{{.}}</li>
					{{/items}}
				</ul>`,
			data: { items }
		});

		ractive.splice( 'items', 1, 1, 'dave', 'eric' ).then( v => {
			t.deepEqual( v, [ 'bob' ] );
			done();
		});
		t.htmlEqual( fixture.innerHTML, '<ul><li>alice</li><li>dave</li><li>eric</li><li>charles</li></ul>' );

		// removing before the beginning removes from the beginning
		ractive.splice( 'items', -10, 1, 'john' );
		t.htmlEqual( fixture.innerHTML, '<ul><li>john</li><li>dave</li><li>eric</li><li>charles</li></ul>' );

		// removing beyond the end is a noop
		ractive.splice( 'items', 10, 1, 'larry' );
		t.htmlEqual( fixture.innerHTML, '<ul><li>john</li><li>dave</li><li>eric</li><li>charles</li><li>larry</li></ul>' );

		// negative indexing within bounds starts from the end
		ractive.splice( 'items', -1, 1 );
		t.htmlEqual( fixture.innerHTML, '<ul><li>john</li><li>dave</li><li>eric</li><li>charles</li></ul>' );
	});
});